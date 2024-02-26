import React from 'react'
import './log.css'

export default function Log() {
  return (
    <div class="login-container">
        <form id="login-form">
            <h2>Login</h2>
            <div class="form-control">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required/>
            </div>
            <div class="form-control">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required/>
            </div>
            <button type="submit">Login</button>
            <p id="error-message"></p>
        </form>
    </div>
  )
}
