import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class StorageService {
  static FlutterSecureStorage storage = const FlutterSecureStorage();

  static Future<String> readData(String key) async {
    return await storage.read(key: key) ?? '';
  }

  static Future<void> writeData(String key, String value) async {
    await storage.write(key: key, value: value);
  }

  static Future<void> deleteData(String key) async {
    await storage.delete(key: key);
  }
}