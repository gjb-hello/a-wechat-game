#include<stdio.h>
#include<math.h>
#include<stdlib.h>

struct Node{
	int base;    //ʵɫ 
	int face;    //��ɫ 
};
Node node [10][10];


int main()
{ 
	int player_dead=2;     //���뱻ɱ��ҵ���ɫ��
	 
	int i ,j;
	int lenth_x,lenth_y;  
	lenth_x=10;
	lenth_y=10;
	FILE *fp=NULL;
	fp=fopen("input.txt","r");
	for(i=0;i<lenth_x;i++)
		for(j=0;j<lenth_y;j++)
			fscanf(fp,"%d",&node[i][j].base);
	for(i=0;i<lenth_x;i++)
		for(j=0;j<lenth_y;j++)
		{
			fscanf(fp,"%d",&node[i][j].face);
		}
	fclose(fp);	
	
	
	//Ĩ������� 
	for(i=0;i<lenth_x;i++)
		for(j=0;j<lenth_y;j++)
		{
			if(node[i][j].base==player_dead)
				node[i][j].base=0;
			if(node[i][j].face==player_dead)
				node[i][j].face=0;
		}
	/* 
	for(i=0;i<lenth_x;i++)
	{
		for(j=0;j<lenth_y;j++)
			printf("%d\t",node[i][j].base);
		printf("\n");
	}
	for(i=0;i<lenth_x;i++)
	{
		for(j=0;j<lenth_y;j++)
			printf("%d\t",node[i][j].face);
		printf("\n");
	}	
	*/ 
	return 0;
}
