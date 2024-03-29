from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils.translation import gettext as _
from .managers import UserManager


class User(AbstractUser):
    FIRST_CLASS = "FIRST_CLASS"
    SECOND_CLASS = "SECOND_CLASS"
    THIRD_CLASS = "THIRD_CLASS"
    ACCOUNT_TYPE_CHOICES = [
        (FIRST_CLASS, 0),
        (SECOND_CLASS, 1),
        (THIRD_CLASS, 2)
    ]
    email = models.EmailField(_('email address'), unique=True)
    username_validator = UnicodeUsernameValidator()
    first_name = None
    last_name = None
    username = models.CharField(
        _("username"),
        max_length=150,
        null=False,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    creator = models.ForeignKey("self", on_delete=models.CASCADE, null=True)
    account_type = models.IntegerField(
        choices=ACCOUNT_TYPE_CHOICES, null=False, default=0
    )

    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ('username',)
    USERNAME_FIELD = "email"

    objects = UserManager()

    def __str__(self):
        return self.email

    @property
    def is_admin(self):
        return self.creator is None
