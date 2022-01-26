from django.urls import path
from . import views

urlpatterns = [
    path('', views.redirect_home_page, name="Redirect to Home page"),
    path('signup', views.sign_up, name="Sign Up"),
    path('signin', views.sign_in, name="Sign In"),
    path('user_details', views.user_details, name="User details"),
    path('validate_email', views.validate_email, name="Sign out"),
    path('signout', views.sign_out, name="Sign out"),
]
