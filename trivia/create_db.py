"""Creates the db"""

from application.models import *

from application.utils.extensions import DB

DB.create_all()


