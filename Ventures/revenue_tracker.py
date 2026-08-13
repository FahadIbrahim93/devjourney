# Automated Revenue Tracker Script
import json
import os
from datetime import datetime
from pathlib import Path

class VentureTracker:
    def __init__(self, data_file="H:/DevJourney/revenue_data.json"):
        self.data_file = data_file
        self.load_data()
    
    def load_data(self):
        if os.path.exists(self.data_file):
            with open(self.data_file, 'r') as f:
                self.data = json.load(f)
        else:
            self.data = {"ventures": {}, "active_venture": None}
    
    def update_venture_revenue(self, venture_name, amount):
        if venture_name in self.data.get("ventures", {}):
            self.data["ventures"][venture_name]["current_revenue"] += amount
            self.data["ventures"][venture_name]["last_updated"] = datetime.now().isoformat()
            self.save_data()
    
    def mark_priority_applied(self):
        if "job_landing" in self.data:
            self.data["job_landing"]["priority_applied"] += 1
            self.save_data()
    
    def save_data(self):
        with open(self.data_file, 'w') as f:
            json.dump(self.data, f, indent=2)
    
    def get_daily_snapshot(self):
        return {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "active_venture": self.data.get("active_venture"),
            "job_landing_progress": self.data.get("job_landing", {}).get("priority_applied", 0),
            "total_revenue": sum(
                v.get("current_revenue", 0) 
                for v in self.data.get("ventures", {}).values()
            )
        }

if __name__ == "__main__":
    tracker = VentureTracker()
    print("Venture tracker initialized")
    print(f"Active Venture: {tracker.data.get('active_venture')}")
    print(f"Job Landing Platforms: {tracker.data.get('job_landing', {}).get('platforms_count', 0)}")