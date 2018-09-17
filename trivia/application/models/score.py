"""Models to allow data structure creation by sqlalchemy"""

from flask_sqlalchemy import SQLAlchemy
from application.utils.extensions import DB, MA
from flask_marshmallow import Marshmallow

class Score(DB.Model):
    """User score table structure."""
    user_id = DB.Column(DB.Integer, primary_key=True)
    score = DB.Column(DB.Integer)
    created = DB.Column(DB.DateTime, primary_key=True)

    def __init__(self, user_id, score, created):
        self.user_id = user_id
        self.score = score
        self.created = created

class ScoreSchema(MA.Schema):
    """Fields to convert to JSON."""
    class Meta:
        """Fields to expose"""
        fields = ("user_id", "score", "created")

