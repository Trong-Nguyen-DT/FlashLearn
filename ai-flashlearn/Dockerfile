FROM python:3.10.12

WORKDIR /app

COPY .env .

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8000
CMD ["python3", "-m", "app.main"]

