import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../supabaseClient";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [session, setSession] = useState(null);
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        setIsAuthenticated(true);
        navigate("/dashboard");
        console.log(session);
      } else {
        // Handle the case when there's no active session
        setSession(null);
        setIsAuthenticated(false);
        // Optionally, you can redirect to a login page or show a message
        // navigate("/login");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, loginsession) => {
      setSession(loginsession);
      console.log(loginsession);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        view="sign_in"
        showLinks={false}
        socialLayout="horizontal"
        onlyThirdPartyProviders={false}
      />
    );
  } else {
    return <div>Logged in!</div>;
  }
};

export default Login;
