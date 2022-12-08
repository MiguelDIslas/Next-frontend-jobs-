import axios from "axios";

export default async (req, res) => {
  if (req.method === "POST") {
    const { firstName, lastName, email, password } = req.body;
    try {
      const response = await axios.post(
        `${process.env.API_URL}/register/`,
        {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message) {
        return res.status(200).json({
          success: true,
        });
      } else {
        res.status(response.status).json({
          error: "Something went wrong with your registration.",
        });
      }
    } catch (err) {
     return res.status(500).json({
        error:
          err.response && (err.response.data.detail || err.response.data.error),
      });
    }
  }
};
