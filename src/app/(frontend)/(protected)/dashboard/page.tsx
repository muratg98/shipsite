import SignoutButton from "../components/signout-button";
import SubscriptionButton from "../components/subscription-button";

export default function Home() {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Hello World</h1>
        <p>Welcome to Payload CMS!</p>
        <SignoutButton/>
        <SubscriptionButton/>
      </div>
    );
  }
  