import requests
import sys
import json
from datetime import datetime
from time import sleep
import uuid

class QuadraLeadAPITester:
    def __init__(self):
        self.base_url = "https://lead-capture-56.preview.emergentagent.com"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=None):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test_name": name,
            "status": "PASSED" if success else "FAILED",
            "timestamp": datetime.now().isoformat(),
            "details": details or {}
        }
        self.test_results.append(result)
        
        status_icon = "✅" if success else "❌"
        print(f"{status_icon} {name}: {'PASSED' if success else 'FAILED'}")
        if details and not success:
            print(f"   Details: {details}")

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        default_headers = {'Content-Type': 'application/json'}
        if headers:
            default_headers.update(headers)

        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        if data:
            print(f"   Data: {json.dumps(data, indent=2)}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=default_headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=default_headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=default_headers, timeout=30)

            print(f"   Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            response_data = {}
            
            try:
                response_data = response.json()
                print(f"   Response: {json.dumps(response_data, indent=2)}")
            except:
                response_data = {"raw_response": response.text}

            self.log_test(name, success, {
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "response_data": response_data
            })

            return success, response_data

        except Exception as e:
            print(f"   Exception: {str(e)}")
            self.log_test(name, False, {"error": str(e)})
            return False, {}

    def test_health_check(self):
        """Test API health check"""
        return self.run_test(
            "Health Check API",
            "GET",
            "/api/",
            200
        )

    def test_create_lead_valid(self):
        """Test creating a lead with valid data"""
        test_lead = {
            "nome": "João Silva Teste",
            "email": f"joao.teste.{uuid.uuid4().hex[:8]}@example.com",
            "celular": "61999887766",
            "quartos": "4"
        }
        
        success, response = self.run_test(
            "Create Lead - Valid Data",
            "POST",
            "/api/leads",
            201,
            data=test_lead
        )
        
        if success and response:
            self.created_lead_id = response.get('id') or response.get('_id')
            self.created_lead_email = test_lead['email']
        
        return success, response

    def test_create_lead_duplicate_email(self):
        """Test creating a lead with duplicate email"""
        if not hasattr(self, 'created_lead_email'):
            print("⚠️ Skipping duplicate email test - no previous lead created")
            return True, {}
            
        duplicate_lead = {
            "nome": "Maria Silva Teste",
            "email": self.created_lead_email,  # Same email as previous test
            "celular": "61988776655",
            "quartos": "3"
        }
        
        return self.run_test(
            "Create Lead - Duplicate Email",
            "POST",
            "/api/leads",
            400,  # Should return error
            data=duplicate_lead
        )

    def test_create_lead_invalid_data(self):
        """Test creating lead with invalid data"""
        invalid_lead = {
            "nome": "",  # Empty name
            "email": "invalid-email",  # Invalid email
            "celular": "123",  # Too short
            "quartos": ""  # Empty quartos
        }
        
        return self.run_test(
            "Create Lead - Invalid Data",
            "POST",
            "/api/leads",
            422,  # Validation error
            data=invalid_lead
        )

    def test_get_leads(self):
        """Test getting list of leads"""
        return self.run_test(
            "Get Leads List",
            "GET",
            "/api/leads",
            200
        )

    def test_get_lead_stats(self):
        """Test getting lead statistics"""
        return self.run_test(
            "Get Lead Statistics",
            "GET",
            "/api/leads/stats",
            200
        )

    def test_get_specific_lead(self):
        """Test getting a specific lead by ID"""
        if not hasattr(self, 'created_lead_id') or not self.created_lead_id:
            print("⚠️ Skipping specific lead test - no lead ID available")
            return True, {}
            
        return self.run_test(
            "Get Specific Lead",
            "GET",
            f"/api/leads/{self.created_lead_id}",
            200
        )

    def test_get_nonexistent_lead(self):
        """Test getting a non-existent lead"""
        fake_id = str(uuid.uuid4())
        return self.run_test(
            "Get Non-existent Lead",
            "GET",
            f"/api/leads/{fake_id}",
            404
        )

    def run_all_tests(self):
        """Run all backend API tests"""
        print("=" * 60)
        print("🚀 Starting Quadra 500 Lead Capture API Tests")
        print("=" * 60)
        
        # Test sequence
        tests = [
            self.test_health_check,
            self.test_create_lead_valid,
            self.test_create_lead_duplicate_email,
            self.test_create_lead_invalid_data,
            self.test_get_leads,
            self.test_get_lead_stats,
            self.test_get_specific_lead,
            self.test_get_nonexistent_lead,
        ]
        
        for test in tests:
            try:
                test()
                sleep(0.5)  # Small delay between tests
            except Exception as e:
                print(f"❌ Test failed with exception: {str(e)}")
                self.log_test(test.__name__, False, {"exception": str(e)})
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Tests run: {self.tests_run}")
        print(f"Tests passed: {self.tests_passed}")
        print(f"Tests failed: {self.tests_run - self.tests_passed}")
        print(f"Success rate: {(self.tests_passed/self.tests_run)*100:.1f}%" if self.tests_run > 0 else "0%")
        
        if self.tests_passed != self.tests_run:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if result['status'] == 'FAILED':
                    print(f"  • {result['test_name']}")
                    if result.get('details'):
                        print(f"    → {result['details']}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = QuadraLeadAPITester()
    success = tester.run_all_tests()
    
    # Save test results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            'timestamp': datetime.now().isoformat(),
            'total_tests': tester.tests_run,
            'passed_tests': tester.tests_passed,
            'success_rate': (tester.tests_passed/tester.tests_run)*100 if tester.tests_run > 0 else 0,
            'test_results': tester.test_results
        }, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())