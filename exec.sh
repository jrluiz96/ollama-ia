docker run --rm --gpus all -p 11434:11434 -e OLLAMA_NUM_CPU=0 --name ollama-gpu -d ollama/ollama
docker exec -it ollama-gpu ollama pull deepseek-r1 && docker exec -it ollama-gpu ollama run deepseek-r1