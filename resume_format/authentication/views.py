import json
from django.contrib.auth import login,logout
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from authentication.models import UserModel
from datetime import datetime


# Create your views here
def redirect_home_page(request):
    return redirect('/signin')


def sign_up(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email_id = request.POST.get('email')
        password = request.POST.get('password')
        user_save = UserModel(first_name=first_name, last_name=last_name, email_id=email_id, password=password)
        user_save.save()
        open('user_details.json', 'w').close()
        with open('user_details.json', 'r+')as json_file:
            user_detail = UserModel.objects.all()
            final_dict = {}
            for user in user_detail:
                data = {'id': user.id, 'first_name': user.first_name, 'last_name': user.last_name,
                        'email_id': user.email_id, 'password': user.password,
                        'user_age': user.user_age, 'date_of_birth': str(user.date_of_birth),
                        'contact_no': user.contact_no, 'last_login': str(user.last_login)}
                final_dict[user.email_id] = data
            json.dump(final_dict, json_file)
        response = {'status': 1, 'message': "Successfully Signed Up"}
        return HttpResponse(json.dumps(response), content_type='application/json')
    return render(request, "authentication/sign_up.html")


def sign_in(request):
    if request.method == 'POST':
        email_id = request.POST.get('email')
        password = request.POST.get('password')
        user_obj = UserModel.objects.filter(email_id=email_id, password=password)
        if user_obj:
            global user_id
            user_id = user_obj[0].id
            response = {'status': 1, 'message': "Successfully logged in"}
            login(request, user_obj[0])
        else:
            print('else')
            response = {'status': 0, 'message': "Either Email or Password is In correct"}
        return HttpResponse(json.dumps(response), content_type='application/json')
    return render(request, "authentication/sign_in.html")


def user_details(request):
    global user_id
    user_detail_dict = {}
    if request.method == 'POST':
        u_id = request.POST.get('user_id')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email_id = request.POST.get('email')
        date_of_birth = request.POST.get('dob')
        age = request.POST.get('age')
        contact_no = request.POST.get('contact')

        user_obj = UserModel.objects.filter(id=u_id)
        if user_obj:
            user_obj[0].first_name = first_name
            user_obj[0].last_name = last_name
            user_obj[0].email_id = email_id
            if date_of_birth:
                date_of_birth = datetime.strptime(str(date_of_birth), '%Y-%m-%d')
            else:
                date_of_birth = None
            user_obj[0].date_of_birth = date_of_birth
            if age:
                user_obj[0].user_age = age
            else:
                user_obj[0].user_age = None
            if contact_no:
                user_obj[0].contact_no = contact_no
            else:
                user_obj[0].contact_no = None
            user_obj[0].save()
            open('user_details.json', 'w').close()
            with open('user_details.json', 'r+')as json_file:
                user_detail = UserModel.objects.all()
                final_dict = {}
                for user in user_detail:
                    data = {'id': user.id, 'first_name': user.first_name, 'last_name': user.last_name,
                            'email_id': user.email_id, 'password': user.password,
                            'user_age': user.user_age, 'date_of_birth': str(user.date_of_birth),
                            'contact_no': user.contact_no, 'last_login': str(user.last_login)}
                    final_dict[user.email_id] = data
                json.dump(final_dict, json_file)
            response = {'status': 1, 'message': "User updated Successfully"}
        else:
            response = {'status': 0, 'message': "ID not found"}

        return HttpResponse(json.dumps(response), content_type='application/json')
    if user_id:
        user_obj = UserModel.objects.filter(id=user_id)
        if user_obj:
            user_detail_dict = {"id": user_obj[0].id, "first_name": user_obj[0].first_name,
                                "last_name": user_obj[0].last_name,
                                "email": user_obj[0].email_id, "age": user_obj[0].user_age or "",
                                "dob": str(user_obj[0].date_of_birth) or "",
                                "contact": user_obj[0].contact_no or ""}
    return render(request, "authentication/user_form_details.html", context=user_detail_dict)


def sign_out(request):
    logout(request)
    response = {'status': 1, 'message': "Successfully logged out"}
    return HttpResponse(json.dumps(response), content_type='application/json')


def validate_email(request):
    response = {'status': 1, 'message': "No issue"}
    if request.method == 'POST':
        u_id = request.POST.get('user_id')
        email_id = request.POST.get('user_email')
        email_obj = UserModel.objects.filter(email_id=email_id)
        print(len(email_obj),"len(email_obj)")
        if u_id:
            user_obj = UserModel.objects.filter(id=u_id)
            if email_obj[0].email_id and user_obj[0].email_id and email_obj[0].email_id != user_obj[0].email_id and \
                    len(email_obj) >= 1:
                response = {'status': 0, 'message': "Email already exist"}
        else:
            if len(email_obj) != 0:
                response = {'status': 0, 'message': "Email already exist"}
    return HttpResponse(json.dumps(response), content_type='application/json')