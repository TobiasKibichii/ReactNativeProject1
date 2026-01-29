import { StyleSheet } from "react-native";

import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export default function ContactScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={280}
          color="#808080"
          name="phone.fill"
          style={styles.headerImage}
        />
      }
    >
      {/* Title */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Contact Us
        </ThemedText>
      </ThemedView>

      <ThemedText style={styles.subtitle}>
        We'd love to hear from you. Reach us through any of the channels below.
      </ThemedText>

      {/* Contact Info */}
      <ThemedView style={styles.card}>
        <ThemedText type="defaultSemiBold">📧 Email</ThemedText>
        <ThemedText>support@example.com</ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="defaultSemiBold">📞 Phone</ThemedText>
        <ThemedText>+254 712 345 678</ThemedText>
      </ThemedView>

      {/* Social Media */}
      <ThemedView style={styles.card}>
        <ThemedText type="defaultSemiBold">🌐 Follow Us</ThemedText>

        <ExternalLink href="https://twitter.com/example">
          <ThemedText type="link">Twitter</ThemedText>
        </ExternalLink>

        <ExternalLink href="https://instagram.com/example">
          <ThemedText type="link">Instagram</ThemedText>
        </ExternalLink>

        <ExternalLink href="https://facebook.com/example">
          <ThemedText type="link">Facebook</ThemedText>
        </ExternalLink>
      </ThemedView>

      {/* Footer note */}
      <ThemedText style={styles.footer}>
        Available Monday – Friday, 9:00 AM – 5:00 PM
      </ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -80,
    left: -30,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 16,
    opacity: 0.8,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    gap: 6,
    marginBottom: 12,
  },
  footer: {
    marginTop: 24,
    textAlign: "center",
    opacity: 0.6,
  },
});
