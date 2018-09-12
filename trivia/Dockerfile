FROM python:3.7-slim

WORKDIR /app

ADD . /app

RUN pip install -r requirements.txt

EXPOSE 80

# ENV FLASK_APP trivia
# ENV FLASK_ENV development

CMD ["python", "trivia.py"]
# ["flask", "run", "-p80", "-h0.0.0.0"]

