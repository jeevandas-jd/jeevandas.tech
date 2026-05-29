import { LocationIcon } from '../icons/LocationIcon';
import { EmailIcon } from '../icons/EmailIcon';
import { PhoneIcon } from '../icons/PhoneIcon';

export function Footer({ data }) {
  return (
    <footer
      style={{
        borderTop: "1px solid #e8e3dc",
        padding: "2.5rem 0 4rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 15,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          {data.name}
        </p>
        <p
          style={{
            fontSize: 11,
            color: "#aaa49c",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <LocationIcon /> {data.location}
        </p>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <a
          href={`mailto:${data.email}`}
          style={{
            fontSize: 12,
            color: "#9a9289",
            textDecoration: "none",
            borderBottom: "1px solid #ddd8d0",
            paddingBottom: 1,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <EmailIcon /> {data.email}
        </a>
        <a
          href={`tel:${data.phone.replace(/\s/g, "")}`}
          style={{
            fontSize: 12,
            color: "#9a9289",
            textDecoration: "none",
            borderBottom: "1px solid #ddd8d0",
            paddingBottom: 1,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <PhoneIcon /> {data.phone}
        </a>
      </div>
    </footer>
  );
}