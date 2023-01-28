import React from 'react';
import styles from '@styles/Landing/IntroVideo.module.scss';
export default function IntroVideo() {
  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>GIỚI THIỆU CHƯƠNG TRÌNH TUYỂN SINH</h1>

        <div className={styles.content}>
        <p className={styles.intro}>
          Năm 2022, trường Đại học Quốc tế tuyển 3.505 chỉ tiêu cho 2 chương
          trình đào tạo (do trường ĐHQT cấp bằng và liên kết đào tạo) bậc Đại
          học với 6 phương thức khác nhau.{' '}
        </p>

        <iframe src="https://www.youtube.com/embed/Zl0BwF27_qA?controls=1&rel=0&playsinline=0&modestbranding=0&autoplay=0&enablejsapi=1&origin=https%3A%2F%2Ftuyensinh.hcmiu.edu.vn&widgetid=1"
      ></iframe>
        </div>
    
      </div>
   
    </React.Fragment>
  );
}
