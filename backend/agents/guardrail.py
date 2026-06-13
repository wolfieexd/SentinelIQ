import re
from typing import Dict, Any

class GuardrailAgent:
    def __init__(self):
        self.secrets_redacted = 0
        self.pii_removed = 0
        self.blocked_actions = 0
        
    def validate(self, content: str) -> Dict[str, Any]:
        original = content
        redacted = content
        
        # AWS Key Regex
        aws_pattern = r"(AKIA[0-9A-Z]{16})"
        if re.search(aws_pattern, redacted):
            self.secrets_redacted += len(re.findall(aws_pattern, redacted))
            redacted = re.sub(aws_pattern, "[REDACTED_AWS_SECRET]", redacted)
            
        # Email Regex
        email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
        if re.search(email_pattern, redacted):
            self.pii_removed += len(re.findall(email_pattern, redacted))
            redacted = re.sub(email_pattern, "[REDACTED_EMAIL]", redacted)
            
        # Unsafe Action Check
        if "delete all" in redacted.lower():
            self.blocked_actions += 1
            redacted = redacted.replace("delete all", "[BLOCKED: UNSAFE ACTION]")

        return {
            "original": original,
            "redacted": redacted,
            "secrets_redacted": self.secrets_redacted,
            "pii_removed": self.pii_removed,
            "blocked_actions": self.blocked_actions
        }
