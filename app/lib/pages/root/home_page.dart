import 'package:app/api/auth_service.dart';
import 'package:app/api/storage_service.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String? _token;

  @override
  void initState() {
    super.initState();
    _fetchToken();
  }

  Future<void> _fetchToken() async {
    final token = await StorageService.readData('jwt');
    setState(() {
      _token = token;
    });
  }

  Future<void> _logout() async {
    await AuthService.logout();  // Remove the JWT token from storage

    // Navigate to the login page
    Navigator.pushReplacementNamed(context, '/login');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home Page'),
      ),
      body: Center(
        child:
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'JWT Token: $_token',
                style: const TextStyle(fontSize: 16),
              ),
              ElevatedButton(
                onPressed: _logout,
                child: const Text('Logout'),
              ),
            ],
          ),
      ),
    );
  }
}