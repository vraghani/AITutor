#!/usr/bin/env python3
"""
Debug authentication issue
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
    print(f"Login Response: {response.text}")
    print(f"Login Cookies: {response.cookies}")
    print(f"Session Cookies: {session.cookies}")
    
    # Test /me endpoint
    print("\n🔍 Testing /me endpoint...")
    me_response = session.get(f"{BASE_URL}/api/auth/me")
    print(f"Me Status: {me_response.status_code}")
    print(f"Me Response: {me_response.text}")
    
    # Check if cookies are being sent
    print(f"\nCookies in session: {dict(session.cookies)}")

if __name__ == "__main__":
    debug_auth()