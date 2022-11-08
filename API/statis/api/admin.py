from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from treebeard.admin import TreeAdmin
from treebeard.forms import movenodeform_factory
from simple_history.admin import SimpleHistoryAdmin
from import_export.admin import ImportExportModelAdmin

from .models import User

# Register your models here.
class UserAdmin(BaseUserAdmin, ImportExportModelAdmin):
    
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('email','username', 'last_login', 'is_admin', 'is_teacher')
    list_filter = ('is_admin', 'is_teacher')
    readonly_fields = ()
    fieldsets = [
        
    ]
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()



# class AssessmentAdmin(SimpleHistoryAdmin, ImportExportModelAdmin):
#     list_display = ('question', 'student', 'assessed_by')
#     search_fields = ['student', 'assessed_by']    


admin.site.register(User, UserAdmin),