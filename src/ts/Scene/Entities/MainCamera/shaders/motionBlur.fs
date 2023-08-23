#version 300 es
precision highp float;

in vec2 vUv;
uniform sampler2D backbuffer0;
uniform sampler2D uVelTex;
uniform sampler2D uVelNeighborTex;
uniform vec2 uResolution;
uniform bool uIsVertical;
uniform float blurRange;

layout (location = 0) out vec4 outColor;

#define SAMPLE 8

void main(void) {
	vec2 coord = vec2( gl_FragCoord.xy );
	vec2 velNeighbor = texture( uVelNeighborTex, vUv ).xy;
	vec2 vel = texture( uVelTex, vUv ).xy;

	vec3 sum = vec3( 0.0 );

	// if( length( velNeighbor ) > length( vel ) ) {

	// 	vel = velNeighbor;
		
	// }

	for( int i = 0; i < SAMPLE; i++ ) {

		float w = float( i ) / float( SAMPLE ) * 2.0;

		sum += texture(backbuffer0, vUv - vel * w ).xyz;

	}

	sum /= float( SAMPLE );

	outColor = vec4(sum, 1.0);

	// outColor += vec4( abs(vel * 10.0), 0.0, 1.0 );

}