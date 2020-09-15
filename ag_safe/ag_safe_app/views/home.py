from django.shortcuts import render, redirect
from ..models import Inspections, User, Facility, Type
import pdfkit
import os

# HOME PAGE


def home_page(request):
    inspection_data = {}
    if 'username' in request.session:
        inspection_data['session_username'] = request.session.get('username')
        inspection_data['session_name'] = request.session.get('name')
    else:
        inspection_data['session_username'] = ''
        return redirect('login')
    user_id = request.session.get('user_id')
    facility = Facility.objects.all()
    inspection_data['facility_data'] = facility
    ins_type = Type.objects.all()
    inspection_data['inspection_type'] = ins_type
    supervisor = User.objects.filter(role_id='1')
    inspection_data['supervisor_data'] = supervisor
    inspection = Inspections.objects.filter(user_id=user_id)
    inspection_data['inspections'] = inspection
    users = User.objects.all()
    inspection_data['users'] = users
    return render(request, 'inspection_module/inspection.html', inspection_data)

