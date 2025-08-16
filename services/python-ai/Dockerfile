FROM python:3.12-slim
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir grpcio grpcio-tools
CMD ["python", "-m", "grpc_tools.protoc", "--version"]
