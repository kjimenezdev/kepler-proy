"""Models to allow data structure creation by sqlalchemy"""

from flask_sqlalchemy import SQLAlchemy
from application.utils.extensions import DB, MA
from flask_marshmallow import Marshmallow

class QuestionOption(DB.Model):
    """Question option table structure."""
    question_id = DB.Column(DB.Integer, primary_key=True)
    content = DB.Column(DB.Text, unique=True)
    position = DB.Column(DB.Integer)

    def __init__(self, question_id, content, position):
        self.question_id = question_id
        self.content = content
        self.position = position

class QuestionOptionSchema(MA.Schema):
    """Fields to convert to JSON."""
    class Meta:
        """Fields to expose"""
        fields = ("question_id", "content", "position")

