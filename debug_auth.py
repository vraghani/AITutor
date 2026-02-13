#!/usr/bin/env python3
"""
Debug authentication issue with explicit cookie handling
"""

import requests
import json

BASE_URL = "http://localhost:3000"

def debug_auth():
    session = requests.Session()
    
    # Test login
    login_data = {
        "email": "student@aitutor.com",
        "password": "student123"
    }
    
    print("🔍 Testing login...")
    response = session.post(f"{BASE_URL}/api/auth/login", json=login_data)
    print(f"Login Status: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        token = data.get('token')
        print(f"Token received: {token[:50]}...")
        
        # Manually set the cookie with correct domain
        session.cookies.set('token', token, domain='localhost', path='/')
        
        print(f"Session cookies after manual set: {dict(session.cookies)}")
        
        # Test /me endpoint
        print("\n🔍 Testing /me endpoint...")
        me_response = session.get(f"{BASE_URL}/api/auth/me")
        print(f"Me Status: {me_response.status_code}")
        print(f"Me Response: {me_response.text}")
        
        if me_response.status_code == 200:
            print("✅ Authentication working!")
            return True
        else:
            print("❌ Authentication still failing")
            return False
    else:
        print(f"❌ Login failed: {response.text}")
        return False

if __name__ == "__main__":
    debug_auth()