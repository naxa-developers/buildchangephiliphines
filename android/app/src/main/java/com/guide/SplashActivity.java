package com.guide;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreaete(savedInstanceState);
        Intent intent = new Intent( packageContext: this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}
