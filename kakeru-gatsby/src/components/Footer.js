import React from "react"
import styled from "styled-components"

const FooterSection = styled.footer`
  background: var(--bg-light);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`

const FooterWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 3rem 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const MapSection = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 300px;
  }
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`

const LocationInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    color: var(--secondary);
    margin-bottom: 1rem;
    font-family: 'Noto Serif JP', serif;
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.8;
    margin-bottom: 0.5rem;
    font-family: 'Noto Serif JP', serif;
  }
  
  .address {
    font-size: 1.1rem;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }
`

const AccessInfo = styled.div`
  h4 {
    color: var(--accent);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
`

const CopyRight = styled.div`
  text-align: center;
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
`

const Footer = () => {
  // 住所をエンコード
  const address = encodeURIComponent("大阪府寝屋川市香里南之町33-22")
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${address}&zoom=16&size=600x400&maptype=roadmap&markers=color:red%7C${address}&key=YOUR_API_KEY&language=ja`
  
  // APIキーなしでOpenStreetMapを使用する代替案
  // 香里南之町33-22の正確な座標と適切なズームレベル
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=135.6697,34.7605,135.6747,34.7635&layer=mapnik&marker=34.7620,135.6722`
  
  return (
    <FooterSection>
      <FooterWrapper>
        <MapSection>
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src={osmUrl}
            style={{ border: 0 }}
            title="KAKERU NEYAGAWA Location"
          />
        </MapSection>
        
        <InfoSection>
          <LocationInfo>
            <h3>KAKERU NEYAGAWA</h3>
            <p className="address">〒572-0084 大阪府寝屋川市香里南之町33-22</p>
            <AccessInfo>
              <h4>アクセス</h4>
              <p>京阪本線「香里園駅」より徒歩約10分</p>
              <p>駐車場：近隣のコインパーキングをご利用ください</p>
            </AccessInfo>
          </LocationInfo>
          
          <LocationInfo>
            <h4>お問い合わせ</h4>
            <p>各テナントへ直接お問い合わせください</p>
          </LocationInfo>
        </InfoSection>
      </FooterWrapper>
      
      <CopyRight>
        <p>&copy; 2024 KAKERU NEYAGAWA. All rights reserved.</p>
      </CopyRight>
    </FooterSection>
  )
}

export default Footer