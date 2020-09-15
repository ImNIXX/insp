from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home_page, name="home-page"),
    path('login/', views.login_page, name="login"),
    path('login-user/', views.user_login, name="login-user"),
    path('user-logout/', views.logout, name="user-logout"),
    path('signup/', views.signup_page, name="signup"),
    path('add-user/', views.insert_user, name="add-user"),
    path('check-username/', views.check_username, name="check-username"),
    path('insert_the_inspection/', views.insert_inspection, name="insert_the_inspection"),
    path('get-inspection/', views.get_insp, name="get-inspection"),
    path('update-inspection/', views.update_insp, name="update-inspection"),
    path('del-insp/', views.delete_insp, name="del-insp"),
    path('inspection-draft/', views.drafts, name="inspection-draft"),
    path('insert-draft/', views.insert_draft, name="insert-draft"),
]