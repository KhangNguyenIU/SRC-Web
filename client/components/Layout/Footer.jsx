import React from 'react';
import styles from '@styles/Layout/Footer.module.scss';
import { Container } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Divider } from '@mui/material';

export default function Footer() {
  return (
    <React.Fragment>
      {/* <Container maxWidth="md"> */}
      <div className={styles.footer}>
        <div className={styles.info}>
          <h3>I&U, Together We Make Differences</h3>
          <hr />
          <div className={styles.social}>
            <FacebookIcon />
            <YouTubeIcon />
            <InstagramIcon />
          </div>
        </div>

        <div className={styles.contact}>
          <h3>Liên hệ</h3>

          <hr />
          <div>
            <span>Trường Đại học Quốc Tế - Đại học Quốc gia TP.HCM</span>
            <span>Địa chỉ: Khu phố 6, P. Linh Trung, Thủ Đức, TP.HCM</span>
            <span>Điện thoại: (028) 37244270</span>
            <span>Fax: (028) 37244271</span>

            <span>Email: info@hcmiu.edu.vn</span>
          </div>
        </div>

        <div className={styles.connect}>
          <h3>Liên kết</h3>
          <hr/>
          <div>
            <span>Giới thiệu</span>
            <span>Sinh viên</span>
            <span>Cán bộ giảng viên</span>
            <span>Chương trình đào tạo</span>

            <span>Tin tức</span>
          </div>
        </div>
      </div>
      {/* </Container> */}
    </React.Fragment>
  );
}
