"""Models to allow data structure creation by sqlalchemy"""

from flask_sqlalchemy import SQLAlchemy
from application.extensions import DB, MA
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


class UserScore(DB.Model):
    """User score table structure."""
    user_id = DB.Column(DB.Integer, primary_key=True)
    score = DB.Column(DB.Integer)
    created = DB.Column(DB.DateTime, primary_key=True)

    def __init__(self, user_id, score, created):
        self.user_id = user_id
        self.score = score
        self.created = created

class UserScoreSchema(MA.Schema):
    """Fields to convert to JSON."""
    class Meta:
        """Fields to expose"""
        fields = ("user_id", "score", "created")

