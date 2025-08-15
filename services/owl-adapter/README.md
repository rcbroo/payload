camel-ai/owl adapter scaffold.

Build:
- docker compose build owl-adapter

Run:
- docker compose up owl-adapter
- POST http://localhost:7010/generate-summary {"text":"..."} -> {"summary":"..."}
