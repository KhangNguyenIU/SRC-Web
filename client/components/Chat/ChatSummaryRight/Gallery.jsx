import React, { useMemo } from 'react';
import styles from '@styles/ChatSummaryRight.module.scss';

import { Skeleton } from '@mui/material';
import useComponentSize from '@hooks/useComponentSize';

const GAP = 20;

export default function Gallery({ media, chatSummaryRef,openModal }) {
  const { width, height } = useComponentSize(chatSummaryRef);
  const imageWidth = useMemo(() => Math.floor(width / 3) - GAP, [width]);
  return (
    <React.Fragment>
      <div className={styles.gallery}>
        <p>Shared files</p>
        <div className={styles.medias} onClick={openModal}>
          {!media.length &&
            Array(3)
              .fill(0)
              .map((item, index) => (
                <Skeleton
                  sx={{ bgcolor: 'grey.900', margin: '5px' }}
                  key={index}
                  variant="rectangular"
                  width={imageWidth}
                  height={imageWidth}
                />
              ))}
          {!!media.length &&
            media.slice(0, 2).map((img, index) => (
              <div key={index} className={styles.medias}>
                <img
                  src={img.content}
                  alt="media"
                  width={imageWidth}
                  height={imageWidth}
                />
              </div>
            ))}

          {media?.length > 2 && (
            <div
            key={media.length - 1}
              className={`${styles.medias} ${styles.number}`}
              style={{
                width: imageWidth,
                height: imageWidth,
                maxWidth: imageWidth,
                maxHeight: imageWidth,
              }}
            >
              +{media.length - 2}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

{
  /* */
}
