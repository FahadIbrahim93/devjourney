# safe_cleanup.py - DevJourney folder cleanup

import os
import shutil
from pathlib import Path
import subprocess

def get_folder_size(path):
    """Get folder size in MB"""
    total = 0
    for folder in Path(path).rglob('*'):
        if folder.is_file():
            total += folder.stat().st_size
    return total / 1024 / 1024

def cleanup_archive_modules():
    """Remove node_modules from archive folders only"""
    vault = Path("H:/DevJourney")
    
    # Target archive folders
    archive_paths = [
        "Archive/BugSmasher",
        "_archived"
    ]
    
    cleaned = []
    for archive in archive_paths:
        archive_path = vault / archive
        if archive_path.exists():
            # Remove node_modules
            for nm in archive_path.rglob('node_modules'):
                size = get_folder_size(nm)
                print(f"Would remove: {nm} ({size:.1f} MB)")
                # Uncomment to actually remove:
                # shutil.rmtree(nm)
                cleaned.append(str(nm.relative_to(vault)))
    
    return cleaned

def remove_large_git_objects():
    """Identify large git objects in archives"""
    vault = Path("H:/DevJourney")
    large_objects = []
    
    for git_obj in vault.rglob('.git/objects/*/*'):
        if git_obj.stat().st_size > 50 * 1024 * 1024:  # > 50MB
            large_objects.append((str(git_obj.relative_to(vault)), git_obj.stat().st_size / 1024 / 1024))
    
    return large_objects

def create_clean_structure():
    """Create the new clean folder structure"""
    vault = Path("H:/DevJourney")
    
    # Create new folders
    new_folders = [
        "00-System",
        "01-SecondBrain", 
        "02-Projects",
        "03-Ventures",
        "04-Freelance",
        "05-Archive/Cleaned",
        "06-Docs"
    ]
    
    for folder in new_folders:
        (vault / folder).mkdir(parents=True, exist_ok=True)
        print(f"Created: {folder}")

if __name__ == "__main__":
    print("=== DevJourney Cleanup Analysis ===\n")
    
    print("Archive node_modules to clean:")
    for item in cleanup_archive_modules()[:5]:  # Show first 5
        print(f"  - {item}")
    
    print("\nLarge git objects (>50MB):")
    for obj, size in remove_large_git_objects()[:5]:
        print(f"  - {obj}: {size:.1f} MB")
    
    print("\nCreating clean structure...")
    create_clean_structure()
    
    print("\n✅ Analysis complete - run with caution for actual cleanup")