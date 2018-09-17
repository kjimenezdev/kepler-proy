"""Models to allow data structure creation by sqlalchemy"""

from flask_sqlalchemy import SQLAlchemy
from application.utils.extensions import DB, MA
from flask_marshmallow import Marshmallow

class User(DB.Model):
    """User table structure."""
    id = DB.Column(DB.Integer, primary_key=True)
    username = DB.Column(DB.String(80), unique=True)
    password = DB.Column(DB.String(120))

    def __init__(self, username, password):
        self.username = username
        self.password = password

class UserSchema(MA.Schema):
    """Fields to convert to JSON."""
    class Meta:
        """Fields to expose"""
        fields = ("id", "username")
