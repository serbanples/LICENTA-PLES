import 'package:app/pages/auth/login_page.dart';
import 'package:app/pages/auth/signup_page.dart';
import 'package:app/pages/loading_page.dart';
import 'package:app/pages/root/home_page.dart';
import 'package:flutter/material.dart';

final Map<String, WidgetBuilder> appRoutes = {
  '/': (context) => const LoadingPage(),
  '/login': (context) => LoginPage(),
  '/signup': (context) => SignupPage(),
  '/home': (context) => const HomePage(),
};