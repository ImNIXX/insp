from django.core import serializers
from django.core.files import File
from django.http import HttpResponse, JsonResponse
from ..models import Inspections, Type
from datetime import date
import os
import time


# INSPECTION INSERT


def insert_inspection(request):
    inspection_title = request.POST.get('inspection_title', None)
    facility = request.POST.get('facility', None)
    stakeholders = request.POST.get('stakeholders', None)
    inspection_type = request.POST.get('inspection_type', None)
    location = request.POST.get('location', None)
    category = request.POST.get('category', None)
    operating_area = request.POST.get('operating_area', None)
    supervisor = request.POST.get('supervisor', None)
    user_id = request.session.get('user_id')
    inspection_add = Inspections(inspection_title=inspection_title, facility=facility, stakeholders=stakeholders, inspection_type=inspection_type, location=location, category=category, operating_area=operating_area, datetime=date.today(), status='0', user_id=user_id, supervisor=supervisor )
    inspection_add.save()
    inspection_data = {'id': inspection_add.id, 'inspection_type': inspection_add.inspection_type, 'date': inspection_add.datetime, 'inspection_name': inspection_add.inspection_title, 'location': inspection_add.location, }
    return JsonResponse(inspection_data)

# GET INSPECTION DATA


def get_insp(request):
    inspection_id = request.POST.get('inspection_id', None)
    inspection_id = int(inspection_id) / 9304
    inspections = Inspections.objects.get(id=inspection_id)
    inspection_data = {'id': inspections.id, 'inspection_title': inspections.inspection_title, 'facility': inspections.facility, 'stakeholders': inspections.stakeholders, 'inspection_type': inspections.inspection_type, 'location': inspections.location, 'category': inspections.category, 'operating_area': inspections.operating_area, 'supervisor': inspections.supervisor}
    return JsonResponse(inspection_data)

# UPDATE INSPECTION DATA


def update_insp(request):
    inspection_id = request.POST.get('inspection_id', None)
    inspection_id = int(inspection_id)/9304
    inspection_title = request.POST.get('inspection_title', None)
    facility = request.POST.get('facility', None)
    stakeholders = request.POST.get('stakeholders', None)
    inspection_type = request.POST.get('inspection_type', None)
    location = request.POST.get('location', None)
    category = request.POST.get('category', None)
    operating_area = request.POST.get('operating_area', None)
    supervisor = request.POST.get('supervisor', None)
    # GET INSPECTION
    ins_data = Inspections.objects.get(id=inspection_id)
    if ins_data.inspection_type == inspection_type:
        insp_type = '0'
    else:
        insp_type = '1'
    # UPDATE INSPECTION
    update_data = Inspections.objects.filter(id=inspection_id).update(inspection_title=inspection_title, facility=facility, stakeholders=stakeholders, inspection_type=inspection_type, location=location, category=category, operating_area=operating_area, supervisor=supervisor)
    ins_data = Inspections.objects.get(id=inspection_id)
    inspection_data = {'id': ins_data.id, 'inspection_title': ins_data.inspection_title, 'facility': ins_data.facility, 'stakeholders': ins_data.stakeholders, 'inspection_type': ins_data.inspection_type, 'location': ins_data.location, 'category': ins_data.category, 'operating_area': ins_data.operating_area, 'supervisor': ins_data.supervisor, 'insp_type_status': insp_type}
    if update_data:
        return JsonResponse(inspection_data)
    else:
        return HttpResponse()

# DRAFT DATA


def drafts(request):
    draft_id = request.POST.get('draft_id', None)
    draft_data = Type.objects.get(id=draft_id)
    draft_html = {'draft_name': draft_data.types, 'draft_html': draft_data.draft_html, 'draft_slug': draft_data.type_slug}
    return JsonResponse(draft_html)


def insert_draft(request):
    inspection_id = request.POST.get('inspection_id', None)
    inspection_id = int(inspection_id)/9304
    draft_html = request.POST.get('draft_html', None)
    draftname = request.POST.get('draftname', None)
    draft_name = request.POST.get('inspection_type', None)
    ins_data = Inspections.objects.get(id=inspection_id)
    if ins_data.draft_name != '':
        ins_dir = ins_data.draft_directory
        draft_name = ins_data.draft_form_name
        draft_file = os.getcwd() + "/ag_safe_app/inspection_dir/" + ins_dir + "/" + draft_name
        os.remove(draft_file)
    ts = int(time.time())
    file_name = str(ts)+draft_name+'.html'
    ins_dir = request.session['ins_dir']
    path_name = os.getcwd() + "/ag_safe_app/inspection_dir/"+ins_dir
    with open(path_name+"/"+str(ts)+draft_name+'.html', 'w') as f:
        myfile = File(f)
        myfile.write(draft_html)
    myfile.closed
    f.closed
    Inspections.objects.filter(id=inspection_id).update(draft_form_name=file_name, draft_directory=ins_dir, draft_name=draftname)
    return HttpResponse('Hello')

# DELETE INSPECTION


def delete_insp(request):
    inspection_id = request.POST.get('inspection_id', None)
    inspection_id = int(inspection_id) / 9304
    ins_data = Inspections.objects.get(id=inspection_id)
    ins_dir = ins_data.draft_directory
    draft_name = ins_data.draft_form_name
    draft_file = os.getcwd() + "/ag_safe_app/inspection_dir/"+ins_dir+"/"+draft_name
    os.remove(draft_file)
    print(ins_data)
    del_data = Inspections.objects.filter(id=inspection_id).delete()
    if del_data[0] == 1:
        return HttpResponse('1')
    else:
        return HttpResponse('0')
