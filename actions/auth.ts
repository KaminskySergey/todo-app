"use server";

export const registerUser = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        message: errorData.message || "Registration failed",
      };
    }

    const data = await res.json();
    return { success: true, message: data.message, user: data.user };
  } catch (error) {
    console.error("Register error:", error);
    return { success: false, message: "Something went wrong" };
  }
};
