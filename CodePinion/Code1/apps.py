from django.apps import AppConfig


class Code1Config(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Code1'

    # def ready(self):
    #     import Code1.signals
