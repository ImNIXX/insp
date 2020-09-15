from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from ..models import User
from django.contrib import messages
import hashlib
import os
import time


# LOGIN


def login_page(request):
    if request.session.get('user_id'):
        response = redirect('home-page')
        return response
    return render(request, 'inspection_module/login.html')


def user_login(request):
    username1 = request.POST.get('username', None)
    password1 = request.POST.get('password', None)
    username_data = User.objects.filter(username=username1)
    if username_data:
        result = hashlib.md5(password1.encode())
        password1 = result.hexdigest()
        password_data = User.objects.filter(username=username1, password=password1)
        if password_data:
            password_data = User.objects.get(username=username1, password=password1)
            request.session['user_id'] = password_data.id
            request.session['username'] = password_data.username
            request.session['name'] = password_data.name
            request.session['email'] = password_data.email
            request.session['ins_dir'] = password_data.user_directory
            return redirect('home-page')
        else:
            messages.warning(request, 'Password is not correct')
            response = redirect('login')
            return response
    else:
        messages.warning(request, 'Username is not correct')
        response = redirect('login')
        return response


# END LOGIN
# LOGOUT

def logout(request):
    if request.session.get('user_id'):
        del request.session['user_id']
        del request.session['username']
        del request.session['email']
        response = redirect('login')
        return response
    else:
        response = redirect('home-page')
        return response


# END LOGOUT
# SIGNUP


def signup_page(request):
    if request.session.get('user_id'):
        response = redirect('home-page')
        return response
    return render(request, 'inspection_module/signup.html')


def check_username(request):
    username = request.POST.get('username', None)
    username_data = User.objects.filter(username=username)
    if username_data:
        username_exist = 'exist'
    else:
        username_exist = 'not exist'
    return HttpResponse(username_exist)


def insert_user(request):
    ts = int(time.time())
    username = request.POST.get('username', None)
    path = os.getcwd() + "/ag_safe_app/inspection_dir/"+str(ts)+"-"+username
    os.mkdir(path)
    dir_name = str(ts)+"-"+username
    name = request.POST.get('name', None)
    email = request.POST.get('email', None)
    password = request.POST.get('password', None)
    pass_result = hashlib.md5(password.encode())
    password = pass_result.hexdigest()
    zipcode = request.POST.get('zipcode', None)
    user_add = User(name=name, username=username, email=email, password=password, zipcode=zipcode, role_id='0', status='1', user_directory=dir_name )
    user_add.save()
    if user_add.id:
        request.session['user_id'] = user_add.id
        request.session['username'] = user_add.username
        request.session['email'] = user_add.email
        request.session['ins_dir'] = user_add.user_directory
        response = redirect('home-page')
        return response
    else:
        response = redirect('signup')
        return response


# END SIGNUP

