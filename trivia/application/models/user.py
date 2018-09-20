"""Models to allow data structure creation by sqlalchemy"""

from flask_sqlalchemy import SQLAlchemy
from application.utils.extensions import DB, MA
from flask_marshmallow import Marshmallow

from passlib.hash import pbkdf2_sha256

class User(DB.Model):
    """User table structure."""
    id = DB.Column(DB.Integer, primary_key=True, autoincrement=True)
    username = DB.Column(DB.String(80), unique=True)
    password = DB.Column(DB.String(120))
    scores = DB.relationship("Score", backref="user", lazy=True)

    def __init__(self, username, password):
        self.username = username
        # Encrypts the user's password
        pwd = pbkdf2_sha256.hash(password)
        self.password = pwd

    def verify_password(self, pwd):
        """Verifies the password by comparing to pwd -> User's stored password"""
        return pbkdf2_sha256.verify(pwd, self.password)

class UserSchema(MA.Schema):
    """Fields to convert to JSON."""
    class Meta:
        """Fields to expose"""
        fields = ("id", "username")
