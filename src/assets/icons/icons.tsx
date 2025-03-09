export const Icons = {
  addPerson: ({ className }: { className?: string }) => {
    return (
      <div className={className}>
        <svg
          width="30"
          height="23"
          viewBox="0 0 30 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.9827 3.14128C16.84 3.14128 15.1708 4.80666 15.1708 6.77874C15.1708 8.75082 16.84 10.4162 18.9827 10.4162C21.1255 10.4162 22.7946 8.75082 22.7946 6.77874C22.7946 4.80666 21.1255 3.14128 18.9827 3.14128ZM12.9944 6.77874C12.9944 3.53098 15.713 0.964844 18.9827 0.964844C22.2525 0.964844 24.971 3.53098 24.971 6.77874C24.971 10.0265 22.2525 12.5926 18.9827 12.5926C15.713 12.5926 12.9944 10.0265 12.9944 6.77874ZM5.50744 5.69053C6.10844 5.69053 6.59565 6.17774 6.59565 6.77874V9.23479H9.18252C9.78352 9.23479 10.2707 9.722 10.2707 10.323C10.2707 10.924 9.78352 11.4112 9.18252 11.4112H6.59565V13.8673C6.59565 14.4683 6.10844 14.9555 5.50744 14.9555C4.90643 14.9555 4.41922 14.4683 4.41922 13.8673V11.4112H1.83236C1.23135 11.4112 0.744141 10.924 0.744141 10.323C0.744141 9.722 1.23135 9.23479 1.83236 9.23479H4.41922V6.77874C4.41922 6.17774 4.90643 5.69053 5.50744 5.69053ZM18.9827 16.7276C12.6456 16.7276 11.0206 20.278 10.8774 21.6587C10.8155 22.2565 10.2806 22.6909 9.68279 22.6289C9.08499 22.5669 8.65063 22.0321 8.71262 21.4343C8.97779 18.8769 11.5996 14.5512 18.9827 14.5512C26.3659 14.5512 28.9877 18.8769 29.2528 21.4343C29.3148 22.0321 28.8805 22.5669 28.2827 22.6289C27.6849 22.6909 27.15 22.2565 27.088 21.6587C26.9448 20.278 25.3199 16.7276 18.9827 16.7276Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  },
  cross: ({ className, fill }: { className?: string; fill?: string }) => {
    return (
      <div className={className}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={fill}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.373537 0.385683C0.876291 -0.123779 1.69685 -0.129218 2.20632 0.373537L11.644 9.68693L21.0816 0.373537C21.5911 -0.129218 22.4117 -0.123779 22.9144 0.385683C23.4172 0.895146 23.4117 1.71571 22.9023 2.21846L13.4891 11.5077L22.9023 20.797C23.4117 21.2997 23.4172 22.1203 22.9144 22.6298C22.4117 23.1392 21.5911 23.1447 21.0816 22.6419L11.644 13.3285L2.20632 22.6419C1.69685 23.1447 0.876291 23.1392 0.373537 22.6298C-0.129218 22.1203 -0.123779 21.2997 0.385683 20.797L9.79889 11.5077L0.385683 2.21846C-0.123779 1.71571 -0.129218 0.895146 0.373537 0.385683Z"
          />
        </svg>
      </div>
    );
  },
  heart: ({ className, fill }: { className?: string; fill?: string }) => {
    return (
      <div className={className}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={fill}
        >
          <path d="M15.0001 3.44269C13.7543 2.33287 12.0653 1.44379 10.211 1.11985C8.00405 0.734321 5.56364 1.15445 3.44334 2.93536C2.03038 4.12215 1.14648 5.98927 0.853582 8.0069C0.558216 10.0415 0.845842 12.3306 1.89817 14.4518C2.65949 15.9865 4.47193 17.917 6.3553 19.6941C8.28002 21.5103 10.4231 23.2968 11.9913 24.5594C13.7349 25.9632 16.2653 25.9632 18.0089 24.5594C19.5772 23.2968 21.7203 21.5103 23.645 19.6942C25.5283 17.9171 27.3408 15.9865 28.1021 14.4518C29.1544 12.3306 29.4421 10.0416 29.1467 8.00692C28.8538 5.98929 27.9699 4.12217 26.5569 2.93538C24.4366 1.15447 21.9962 0.734336 19.7893 1.11986C17.935 1.44379 16.246 2.33287 15.0001 3.44269Z" />
        </svg>
      </div>
    );
  },
  info: () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>
    );
  },

  walk: ({ className }: { className?: string }) => {
    return (
      <div className={className}>
        <svg
          className="h-full w-full"
          width="9"
          height="15"
          viewBox="0 0 9 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.62834 5.64661L3.57582 4.13772C3.79444 3.96707 4.06035 3.87945 4.33112 3.88883C4.66137 3.89762 4.98086 4.01594 5.24516 4.22735C5.50946 4.43876 5.70544 4.73276 5.80586 5.06846C5.91888 5.44633 6.02218 5.7017 6.11576 5.83458C6.3985 6.23695 6.76527 6.56349 7.18696 6.78828C7.60866 7.01307 8.07367 7.12993 8.54509 7.12958V8.42587C7.91758 8.4266 7.29773 8.27892 6.73014 7.99347C6.16255 7.70802 5.66136 7.29189 5.26263 6.77504L4.83911 9.33846L6.09145 10.4598L7.44223 14.4187L6.29987 14.862L5.06029 11.2298L3.00039 9.38578C2.83134 9.24017 2.70199 9.04889 2.62579 8.83184C2.54959 8.6148 2.52934 8.37993 2.56714 8.15171L2.87643 6.2818L2.46506 6.60069L1.17261 8.49847L0.189453 7.73624L1.61801 5.63883L1.62834 5.64661ZM5.20308 3.56476C4.88077 3.56476 4.57166 3.42819 4.34375 3.18508C4.11584 2.94198 3.9878 2.61226 3.9878 2.26846C3.9878 1.92467 4.11584 1.59495 4.34375 1.35184C4.57166 1.10874 4.88077 0.972168 5.20308 0.972168C5.52539 0.972168 5.8345 1.10874 6.06241 1.35184C6.29032 1.59495 6.41836 1.92467 6.41836 2.26846C6.41836 2.61226 6.29032 2.94198 6.06241 3.18508C5.8345 3.42819 5.52539 3.56476 5.20308 3.56476ZM3.39718 12.108L1.44423 14.5904L0.513325 13.7575L2.32166 11.4592L2.77496 10.0462L3.86324 11.0185L3.39718 12.108Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  },

  xMark: ({ className }: { className?: string }) => {
    return (
      <div className={className}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
    );
  },

  arrowRight: ({ className }: { className?: string }) => {
    return (
      <div className={className}>
        <svg
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.81032 0.482593C7.04754 0.264073 7.41699 0.27923 7.63551 0.516447L11.4012 4.60434C11.6072 4.82791 11.6072 5.17209 11.4012 5.39567L7.63551 9.48356C7.41699 9.72078 7.04754 9.73593 6.81032 9.51741C6.5731 9.29889 6.55795 8.92945 6.77647 8.69223L9.63972 5.58399H1.04395C0.72142 5.58399 0.459961 5.32253 0.459961 5C0.459961 4.67748 0.72142 4.41602 1.04395 4.41602H9.63972L6.77647 1.30778C6.55795 1.07056 6.5731 0.701113 6.81032 0.482593Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  },

  arrowLeft: ({ className }: { className?: string }) => {
    return (
      <div className={className}>
        <svg
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          className="rotate-180"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.81032 0.482593C7.04754 0.264073 7.41699 0.27923 7.63551 0.516447L11.4012 4.60434C11.6072 4.82791 11.6072 5.17209 11.4012 5.39567L7.63551 9.48356C7.41699 9.72078 7.04754 9.73593 6.81032 9.51741C6.5731 9.29889 6.55795 8.92945 6.77647 8.69223L9.63972 5.58399H1.04395C0.72142 5.58399 0.459961 5.32253 0.459961 5C0.459961 4.67748 0.72142 4.41602 1.04395 4.41602H9.63972L6.77647 1.30778C6.55795 1.07056 6.5731 0.701113 6.81032 0.482593Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  },

  metro: ({ className, fill }: { className?: string; fill?: string }) => {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect width="24" height="24" rx="12" fill={fill ?? '#9620A1'} />
        <g clipPath="url(#clip0_2732_4552)">
          <path
            d="M14.3303 5.61572L11.9959 12.9751L9.6617 5.61572C6.88496 6.57015 4.7959 9.15923 4.7959 12.1274C4.7959 13.9152 5.52525 15.5639 6.7052 16.779H10.0895L10.4443 15.2404C6.4012 13.6562 7.16569 8.74741 8.63139 7.94612C8.80536 7.99844 11.3547 16.7428 11.3547 16.7428C11.3896 16.7428 11.5027 16.7428 11.641 16.7428C11.6702 16.7428 11.7801 16.7428 11.9171 16.7428C11.9667 16.7428 12.0202 16.7428 12.0745 16.7428C12.1676 16.7428 12.2642 16.7428 12.3505 16.7428C12.4889 16.7428 12.6019 16.7428 12.6369 16.7428C12.6369 16.7428 15.1864 7.99844 15.3603 7.94612C16.8261 8.74741 17.5903 13.6562 13.5472 15.2404L13.9022 16.779H17.2864C18.4665 15.5639 19.1959 13.9152 19.1959 12.1274C19.1959 9.15923 17.1068 6.57015 14.3303 5.61572Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_2732_4552">
            <rect
              width="14.4"
              height="14.4002"
              fill="white"
              transform="translate(4.79883 3.99854)"
            />
          </clipPath>
        </defs>
      </svg>
    );
  },

  swipes: ({ className, fill }: { className?: string; fill?: string }) => {
    return (
      <div className={className}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_4523_2384)">
            <rect
              x="9"
              y="3.21094"
              width="19"
              height="26"
              rx="6"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="7.22474"
              y="3.20578"
              width="18.8207"
              height="26.3918"
              rx="6"
              fill={fill}
              stroke="currentColor"
              strokeWidth="2"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 13.5 29.21045"
                to="-15 13.5 29.21045"
                dur="0.2s"
                fill="freeze"
              />
            </rect>
          </g>
        </svg>{' '}
      </div>
    );
  },

  matches: ({ className, fill }: { className?: string; fill?: string }) => {
    return (
      <div className={className}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_4523_2385)">
            <rect
              x="4"
              y="3.21045"
              width="19"
              height="26"
              rx="6"
              stroke="currentColor"
              strokeWidth="2"
            />
            <g>
              <rect
                x="6"
                y="2.31045"
                width="19"
                height="26"
                rx="6"
                fill={fill}
                stroke="currentColor"
                strokeWidth="2"
              />

              <g transform="translate(9.5, 10.21045)">
                <path
                  d="M9.35689 1.88204C9.14407 1.66913 8.89139 1.50023 8.61328 1.38499C8.33518 1.26976 8.03709 1.21045 7.73605 1.21045C7.43502 1.21045 7.13693 1.26976 6.85882 1.38499C6.58071 1.50023 6.32803 1.66913 6.11522 1.88204L5.67355 2.32371L5.23189 1.88204C4.80201 1.45217 4.21898 1.21067 3.61105 1.21067C3.00312 1.21067 2.42009 1.45217 1.99022 1.88204C1.56035 2.31192 1.31885 2.89495 1.31885 3.50288C1.31885 4.11081 1.56035 4.69384 1.99022 5.12371L2.43189 5.56538L5.67355 8.80704L8.91522 5.56538L9.35689 5.12371C9.5698 4.9109 9.7387 4.65822 9.85393 4.38011C9.96917 4.102 10.0285 3.80391 10.0285 3.50288C10.0285 3.20184 9.96917 2.90375 9.85393 2.62565C9.7387 2.34754 9.5698 2.09486 9.35689 1.88204Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 13.5 29.21045"
                to="15 13.5 29.21045"
                dur="0.2s"
                fill="freeze"
              />
            </g>
          </g>
        </svg>
      </div>
    );
  }
};
