import 'dart:convert';

import 'package:app/api/storage_service.dart';
import 'package:http/http.dart' as http;

class AuthService {
  static Future<void> signUserUp(String username, String email, String password) async {
    final response = await http.post(
      Uri.parse('http://backend/api/signup'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'username': username,
        'email': email,
        'password': password,
      }),
    );
    
    if(response.statusCode != 201) {
      final responseData = jsonDecode(response.body);
      throw Exception(responseData['message']);
    }
  }

  static Future<void> loginUser(String email, String password) async {
    final response = await http.post(
      Uri.parse('http://192.168.1.16:3000/api/login'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'email': email,
        'password': password,
      }),
    );
    
    final responseData = jsonDecode(response.body);
    if(response.statusCode != 200) {
      throw Exception(responseData['message']);
    } else {
      await StorageService.writeData('jwt', responseData['token']);
    }
  }

  static Future<void> logout() async {
    await StorageService.deleteData('jwt');
  }
}