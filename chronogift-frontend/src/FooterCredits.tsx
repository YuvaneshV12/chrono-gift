// FooterCredits.tsx
import styled from "styled-components";

const Footer = styled.footer`
  width: 100%;
  text-align: center;
  padding: 12px 0;
  font-size: 0.85rem;
  color: #999;
  user-select: none;
  background: #f9f9f9;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export default function FooterCredits() {
  return (
    <Footer>
      <a href="https://www.linkedin.com/in/yuvanesh-v-78730b32a/" target="_blank" rel="noopener noreferrer">
          Yuvanesh V
        </a></Footer>
  );
}
