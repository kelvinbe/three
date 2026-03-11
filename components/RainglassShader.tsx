const RainGlassShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
  },

  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    varying vec2 vUv;

    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;

      // rain streak distortion
      float n = noise(vec2(uv.x * 30.0, uv.y * 6.0 + time * 0.4));
      uv.y -= n * 0.08;

      vec4 color = texture2D(tDiffuse, uv);

      // dark fog
      color.rgb *= smoothstep(0.1, 0.9, uv.y);

      // vignette
      float d = distance(uv, vec2(0.5));
      color.rgb *= smoothstep(0.9, 0.4, d);

      gl_FragColor = color;
    }
  `,
};

export default RainGlassShader;