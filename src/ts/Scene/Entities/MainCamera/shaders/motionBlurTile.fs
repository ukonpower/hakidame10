#version 300 es
precision highp float;

in vec2 vUv;
uniform sampler2D backbuffer0;
uniform sampler2D uVelTex;
uniform vec2 uResolution;
uniform bool uIsVertical;
uniform float blurRange;

layout (location = 0) out vec4 outColor;

#define NUM 16

void main(void) {
	vec2 coord = vec2( gl_FragCoord.xy );
	vec2 vel = vec2( 0.0 );

	vec3 sum = vec3( 0.0 );

	for( int i = 0; i < NUM; i++ ) {

		for( int j = 0; j < NUM; j++ ) {

			vec2 offset = vec2( 
				( float(j) / float(NUM) - 0.5 ) * ( 1.0 / 16.0 ),
				( float(i) / float(NUM) - 0.5 ) * ( 1.0 / 16.0 )
			);

			vec2 currentVel = texture( uVelTex, vUv + offset ).xy;

			if( length(currentVel) > length( vel ) ) {

				vel = currentVel;
				
			}

		}

	}

	outColor = vec4( vel, 1.0, 1.0 );

}