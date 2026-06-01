import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { content, CONTACT, type Locale } from "../i18n/content";

const colors = {
  night: "#14110f",
  gold: "#b08d2a",
  ink: "#1f1b17",
  muted: "#5c544c",
  line: "#d8cfc0",
  cream: "#fbf8f2",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: colors.ink,
    lineHeight: 1.5,
  },
  header: {
    backgroundColor: colors.night,
    color: colors.cream,
    paddingVertical: 28,
    paddingHorizontal: 40,
  },
  name: {
    fontFamily: "Times-Bold",
    fontSize: 24,
    letterSpacing: 0.5,
    color: colors.cream,
  },
  role: {
    fontSize: 11,
    color: "#d4af37",
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    fontSize: 9,
    color: "#cfc6b8",
  },
  contactItem: { marginRight: 14 },
  body: { paddingVertical: 24, paddingHorizontal: 40 },
  section: { marginBottom: 18 },
  sectionTitle: {
    fontFamily: "Times-Bold",
    fontSize: 13,
    color: colors.gold,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  paragraph: { marginBottom: 6, color: colors.ink },
  itemHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  itemTitle: { fontFamily: "Helvetica-Bold", fontSize: 11, color: colors.ink },
  itemPlace: { color: colors.gold, fontSize: 10, marginBottom: 2 },
  itemPeriod: { color: colors.muted, fontSize: 9 },
  itemDesc: { color: colors.muted, marginBottom: 8 },
  columns: { flexDirection: "row", justifyContent: "space-between" },
  skillCol: { width: "48%" },
  bullet: { flexDirection: "row", marginBottom: 3 },
  bulletDot: { color: colors.gold, marginRight: 5 },
  bulletText: { color: colors.ink, flex: 1 },
  drinkRow: { marginBottom: 4 },
  drinkName: { fontFamily: "Helvetica-Bold", color: colors.ink },
  drinkDesc: { color: colors.muted },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    fontSize: 8,
    color: colors.muted,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 8,
  },
});

function Bullet({ children }: { children: string }) {
  return (
    <View style={styles.bullet}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

export function ResumeDocument({ locale }: { locale: Locale }) {
  const t = content[locale];
  const half = Math.ceil(t.skills.core.length / 2);
  const coreLeft = t.skills.core.slice(0, half);
  const coreRight = t.skills.core.slice(half);

  return (
    <Document
      title={`CV - ${t.hero.name}`}
      author={t.hero.name}
      subject={t.hero.role}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{t.hero.name}</Text>
          <Text style={styles.role}>{t.hero.role}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{CONTACT.email}</Text>
            <Text style={styles.contactItem}>{CONTACT.phone}</Text>
            <Text style={styles.contactItem}>{CONTACT.city}</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* Profile */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.about.title}</Text>
            {t.about.paragraphs.map((p, i) => (
              <Text key={i} style={styles.paragraph}>
                {p}
              </Text>
            ))}
          </View>

          {/* Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {locale === "es" ? "Experiencia" : "Experience"}
            </Text>
            {t.experience.items.map((item, i) => (
              <View key={i} wrap={false}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.itemTitle}>{item.role}</Text>
                  <Text style={styles.itemPeriod}>{item.period}</Text>
                </View>
                <Text style={styles.itemPlace}>{item.place}</Text>
                <Text style={styles.itemDesc}>{item.desc}</Text>
              </View>
            ))}
          </View>

          {/* Education */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t.experience.educationTitle}
            </Text>
            <View wrap={false}>
              <View style={styles.itemHeaderRow}>
                <Text style={styles.itemTitle}>
                  {t.experience.education.degree}
                </Text>
                <Text style={styles.itemPeriod}>
                  {t.experience.education.period}
                </Text>
              </View>
              <Text style={styles.itemPlace}>
                {t.experience.education.place}
              </Text>
              <Text style={styles.itemDesc}>{t.experience.education.desc}</Text>
            </View>
          </View>

          {/* Skills */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.skills.coreTitle}</Text>
            <View style={styles.columns}>
              <View style={styles.skillCol}>
                {coreLeft.map((s) => (
                  <Bullet key={s}>{s}</Bullet>
                ))}
              </View>
              <View style={styles.skillCol}>
                {coreRight.map((s) => (
                  <Bullet key={s}>{s}</Bullet>
                ))}
              </View>
            </View>
          </View>

          {/* Signature drinks */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t.skills.signatureTitle}
            </Text>
            {t.skills.drinks.map((d) => (
              <View key={d.name} style={styles.drinkRow}>
                <Text>
                  <Text style={styles.drinkName}>{d.name}</Text>
                  <Text style={styles.drinkDesc}> — {d.desc}</Text>
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.footer} fixed>
          {t.hero.name} · {t.hero.role} ·{" "}
          <Link src={`mailto:${CONTACT.email}`}>{CONTACT.email}</Link>
        </Text>
      </Page>
    </Document>
  );
}
