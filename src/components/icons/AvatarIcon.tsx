'use client';

import React from 'react';

export default function AvatarIcon({ className }: { className?: string }) {
    return (
        <svg
          viewBox="0 0 2200 2200"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          fill="none"
        >
          <defs>
            <radialGradient
              id="grad1"
              cx="742.4818"
              cy="737.5518"
              r="1257.2716"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#63DFFC" />
              <stop offset="1" stopColor="#3F7CD1" />
            </radialGradient>
    
            <radialGradient
              id="grad2"
              cx="1024.0569"
              cy="699.494"
              r="480.5576"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="0.9989" stopColor="#D1D1D1" />
            </radialGradient>
    
            <radialGradient
              id="grad3"
              cx="965.7524"
              cy="1455.6234"
              r="674.9591"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset="0.9989" stopColor="#D1D1D1" />
            </radialGradient>
          </defs>
    
    
          <path
            d="M1903,1100c0,215.52-84.91,411.21-223.1,555.44C1533.74,1808.01,1327.96,1903,1100,1903
              s-433.74-94.99-579.9-247.56C381.91,1511.21,297,1315.52,297,1100c0-443.48,359.52-803,803-803S1903,656.52,1903,1100z"
            fill="url(#grad1)"
          />
    
          <circle
            cx="1100"
            cy="815.047"
            r="328.046"
            fill="url(#grad2)"
          />
    
          <path
            d="M1679.9,1655.44
              C1533.74,1808.01,1327.96,1903,1100,1903s-433.74-94.99-579.9-247.56c82.54-240.93,311-414.12,579.9-414.12
              S1597.36,1414.51,1679.9,1655.44z"
            fill="url(#grad3)"
          />
        </svg>
      );
}