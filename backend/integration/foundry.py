import json
import faiss
from sentence_transformers import SentenceTransformer
import numpy as np
from typing import List, Dict, Any

class FoundryIQIntegration:
    def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.documents = []
        self.index = None
        self._load_knowledge_base()

    def _load_knowledge_base(self):
        try:
            with open("data/knowledge_base.json", "r") as f:
                self.documents = json.load(f)
            
            # Create embeddings
            texts = [f"{doc['title']}. {doc['content']}" for doc in self.documents]
            embeddings = self.model.encode(texts, convert_to_numpy=True)
            
            # Initialize FAISS index
            dimension = embeddings.shape[1]
            self.index = faiss.IndexFlatL2(dimension)
            self.index.add(embeddings)
        except Exception as e:
            print(f"Warning: Failed to load Foundry IQ Knowledge Base: {e}")

    def query(self, search_term: str, top_k: int = 3) -> List[Dict[str, Any]]:
        if not self.index or not self.documents:
            return []
            
        query_vector = self.model.encode([search_term], convert_to_numpy=True)
        distances, indices = self.index.search(query_vector, top_k)
        
        results = []
        for i, idx in enumerate(indices[0]):
            if idx < len(self.documents):
                doc = self.documents[idx]
                # Convert L2 distance to a pseudo-confidence score (0-100%)
                # Lower distance = higher similarity. Thresholding for demo purposes.
                score = max(0, min(100, int(100 - (distances[0][i] * 10))))
                
                results.append({
                    "title": doc["title"],
                    "collection": doc["collection"],
                    "excerpt": doc["content"],
                    "confidence": score
                })
                
        return results
