"""Models to allow data structure creation by sqlalchemy"""

from flask_sqlalchemy import SQLAlchemy
from application.utils.extensions import DB, MA
from flask_marshmallow import Marshmallow
# from application.models.user import User

class Score(DB.Model):
    """User score table structure."""
    score = DB.Column(DB.Integer)
    user_id = DB.Column(DB.Integer, DB.ForeignKey('user.id'), primary_key=True)
    created = DB.Column(DB.DateTime, primary_key=True)

    def __init__(self, user_id, score, created):
        self.score = score
        self.created = created
        self.user_id = user_id

class ScoreSchema(MA.Schema):
    """Fields to convert to JSON."""
    class Meta:
        """Fields to expose"""
        fields = ("user_id", "score", "created")

class UserScoreSchema(MA.Schema):
    """Fields to convert to JSON."""
    class Meta:
        """Fields to expose"""
        fields = ("id","username", "score", "created")

