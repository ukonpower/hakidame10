import { gl, power } from '~/ts/Globals';
import { GLPowerFrameBuffer } from '../../../GLPowerFrameBuffer';
import { GLPowerTexture } from '../../../GLPowerTexture';
import { Vector } from '../../../Math/Vector';
import { Material, MaterialParam } from '../Material';

export interface PostProcessPassParam extends MaterialParam{
	// input?: ( GLPowerTexture | null )[],
	renderTarget?: GLPowerFrameBuffer | null,
	clearColor?: Vector;
	clearDepth?: number;
	resolutionFactor?: number;
	passThrough?: boolean;
}

import quadVert from './shaders/quad.vs';
import { ComponentResizeEvent } from '..';

export class PostProcessPass extends Material {

	public renderTarget: GLPowerFrameBuffer | null;

	public clearColor: Vector | null;
	public clearDepth: number | null;

	public resolutionFactor: number;
	public passThrough: boolean;

	constructor( param: PostProcessPassParam ) {

		super( { ...param, vert: param.vert || quadVert } );

		this.renderTarget = param.renderTarget !== undefined ? param.renderTarget : new GLPowerFrameBuffer( gl ).setTexture( [
			power.createTexture().setting( { magFilter: gl.LINEAR, minFilter: gl.LINEAR } ),
		] );

		this.clearColor = param.clearColor ?? null;
		this.clearDepth = param.clearDepth ?? null;
		this.depthTest = param.depthTest !== undefined ? param.depthTest : false;
		this.resolutionFactor = param.resolutionFactor || 1;
		this.passThrough = param.passThrough ?? false;

	}

	public onAfterRender() {
	}

	public resize( event: ComponentResizeEvent ): void {

		if ( this.renderTarget ) {

			this.renderTarget.setSize( event.resolution.clone().multiply( this.resolutionFactor ) );

		}

	}

}
