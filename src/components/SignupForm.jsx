import React, { useState } from "react";

export default function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.age) {
      alert("Fill all fields");
      return;
    }

    alert("Signup Success 🎉");
  };

  return (
    <form onSubmit={handleSignup}>

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Age"
        onChange={(e) =>
          setForm({ ...form, age: e.target.value })
        }
      />

      <button type="submit">Sign Up</button>

    </form>
  );
}